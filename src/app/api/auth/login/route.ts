import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("CRITICAL: Missing JWT_SECRET environment variable");
}

// bcrypt hash of the teacher PIN (safe to store in code — bcrypt is one-way)
const TEACHER_PIN_HASH = '$2b$10$TMjkQjx0FxbAhOvptUSE7etnbS5gexBqPCvb5hA07qqhCN2t/fY8q';

// Simple in-memory rate limiter (per container)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  rateLimitMap.forEach((data, key) => {
    if (data.timestamp < windowStart) rateLimitMap.delete(key);
  });
  const record = rateLimitMap.get(ip) || { count: 0, timestamp: now };
  if (record.count >= MAX_REQUESTS_PER_WINDOW) return true;
  record.count += 1;
  rateLimitMap.set(ip, record);
  return false;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { pin, studentName } = body;

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút' }, { status: 429 });
    }

    let user;

    if (pin) {
      // Teacher Login
      if (!TEACHER_PIN_HASH) {
        return NextResponse.json({ error: 'Lỗi cấu hình server (Thiếu PIN Hash)' }, { status: 500 });
      }

      const isMatch = await bcrypt.compare(pin, TEACHER_PIN_HASH);
      if (!isMatch) {
        return NextResponse.json({ error: 'Mã PIN không đúng' }, { status: 401 });
      }

      user = await User.findOne({ role: 'teacher' });
      if (!user) {
        user = await User.create({ name: 'Teacher', role: 'teacher' });
      }
    } else if (studentName) {
      // Student Login
      if (!studentName.trim()) {
        return NextResponse.json({ error: 'Tên không được để trống' }, { status: 400 });
      }

      user = await User.findOne({ name: studentName, role: 'student' });
      if (!user) {
        user = await User.create({ name: studentName, role: 'student' });
      }
    } else {
      return NextResponse.json({ error: 'Thiếu thông tin đăng nhập' }, { status: 400 });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only Cookie
    const serialized = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, role: user.role },
    });
    
    response.headers.set('Set-Cookie', serialized);

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
