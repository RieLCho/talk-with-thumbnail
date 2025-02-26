import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import Preview, { ImageType } from '@/components/Preview'
export const runtime = "edge"

export async function GET(
  req: NextRequest,
  { params }: { params: { message: string } }
) {
  try {
    const message = decodeURIComponent(params.message).slice(0, 100).trim() || '하고싶은 말'
    
    // 쿼리 파라미터에서 이미지 타입 추출 (기본값: sana_stare)
    const { searchParams } = new URL(req.url);
    const imageType = searchParams.get('type') as ImageType || 'sana_stare';

    const origin = req.headers.get('host') || 'localhost:3000'
    const protocol = origin.includes('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${origin}`

    return new ImageResponse(
      (
        <Preview message={message} imageBaseUrl={baseUrl} imageType={imageType} />
      ),
      {
        width: 600,
        height: 315,
        emoji: 'twemoji',
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
} 