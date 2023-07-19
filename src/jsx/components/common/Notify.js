import React from 'react'
import { toast } from 'react-toastify';

export function notify({message,position='top-center'}) {
    const notifier = () => {
        toast.success(message, {
          position: position,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      return notifier;
}
