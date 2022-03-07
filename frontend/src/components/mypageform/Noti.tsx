import React from 'react';
import ReactDOM from 'react-dom';

const useNotification = (title: any, options: any) => {
  if (!('Notification' in window)) {
    return;
  }

  const fireNotif = () => {
    /* 권한 요청 부분 */
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          /* 권한을 요청받고 nofi를 생성해주는 부분 */
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      /* 권한이 있을때 바로 noti 생성해주는 부분 */
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const Noti = () => {
  const triggerNotif = useNotification('Test Noti', {
    body: 'notification body test',
  });
  return (
    <div>
      <button className="bg-slate-700" onClick={triggerNotif}>
        {' '}
        Push notification{' '}
      </button>
    </div>
  );
};

export default Noti;
