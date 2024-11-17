import React, { useEffect } from 'react';
import './SplashScreen.css'; // 스타일 추가
import start from './assets/start.png';

const SplashScreen = ({ onSplashFinish }) => {
  useEffect(() => {
    // 스플래시 화면이 이미 표시된 적이 있으면 onSplashFinish를 호출하지 않음
    if (sessionStorage.getItem('splashScreenShown') === 'true') {
      onSplashFinish();
      return;
    }

    // 타이머를 설정해서 2초 후에 스플래시 화면을 종료
    const timer = setTimeout(() => {
      onSplashFinish();
      sessionStorage.setItem('splashScreenShown', 'true'); // 스플래시 화면을 이미 본 것으로 저장
    }, 2000);

    return () => clearTimeout(timer);
  }, [onSplashFinish]);

  return (
    <div className="splash-screen">
      <img className="splash-img" src={start} alt="start" />
    </div>
  );
};

export default SplashScreen;
