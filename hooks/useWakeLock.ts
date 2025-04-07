import { useEffect, useRef } from "react";
import { Platform } from "react-native";

type WakeLockSentinelWithRelease = WakeLockSentinel & {
  released: boolean;
};

export default function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinelWithRelease | null>(null);

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const wakeLock = await (navigator as any).wakeLock.request("screen");
        wakeLockRef.current = wakeLock;

        console.log("Wake Lock acquired");

        wakeLock.addEventListener("release", () => {
          console.log("Wake Lock was released");
        });
      } else {
        alert(
          "Wake lock is not supported. Change your device’s settings to never sleep the display."
        );
      }
    } catch (err) {
      console.error("Error acquiring Wake Lock:", err);
    }
  };

  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        console.log("Wake Lock released manually");
        wakeLockRef.current = null;
      }
    } catch (err) {
      console.error("Error releasing Wake Lock:", err);
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      requestWakeLock();

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          requestWakeLock();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        releaseWakeLock();
      };
    }
  }, []);

  return { releaseWakeLock };
}
