import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ToastComponent = () => {
  return (
    <>
      <Toaster
        position="top right"
        toastOptions={{
          success: {
            style: {
              background: "#00712D",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#D91656",
              color: "#fff",
            },
          },
          loading: {
            style: {
              background: "#1D2B53",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export const successToast = (msg) => {
  toast.success(msg);
};

export const errorToast = (msg, duration) => {
  toast.error(msg, duration);
};

export default ToastComponent;