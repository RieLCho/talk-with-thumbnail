import BlueArchivePreview from './BlueArchivePreview';
import PlainPreview from './PlainPreview';
import SansPreview from './SansPreview';

export interface PreviewProps {
  message: string;
  imageBaseUrl?: string;
  imageType?: ImageType;
  subType?: string; // 이미지 서브타입 (예: 표정, 포즈 등)
}

export type ImageType = 'sana_stare' | 'sana_dizzy' | 'cat_lick' | 'cat_scared' | 'ichihime' | 'sans' | 'hikari' | 'nozomi';

// 기본 Preview 컴포넌트 - 이미지 타입에 따라 적절한 컴포넌트를 렌더링
export default function Preview({ message, imageBaseUrl = '', imageType = 'sana_stare', subType = '' }: PreviewProps) {
  // BlueArchive 캐릭터인지 확인
  const isBlueArchive = imageType === 'hikari' || imageType === 'nozomi';
  
  // Sans 캐릭터인지 확인
  if (imageType === 'sans') {
    return <SansPreview message={message} imageBaseUrl={imageBaseUrl} imageType={imageType} subType={subType} />;
  }
  
  // 이미지 타입에 따라 다른 컴포넌트 렌더링
  if (isBlueArchive) {
    return <BlueArchivePreview message={message} imageBaseUrl={imageBaseUrl} imageType={imageType} subType={subType} />;
  }
  
  return <PlainPreview message={message} imageBaseUrl={imageBaseUrl} imageType={imageType} subType={subType} />;
}

