import { QrCodeScanner, Stop } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import { truncate } from "fs/promises";
import QrScanner from "qr-scanner";
import React, { FC, useRef, useState } from "react";
import { Icons } from "./Icons";

let stopScan = false;
let hasilScan = "";

interface ScannerProps {}

const Scanner: FC<ScannerProps> = ({}) => {
  const [btnScan, setBtnScan] = useState(true);
  // const [hasilScan, setHasilScan] = useState("");

  // const fileSelectorRef = useRef<HTMLInputElement>(null);

  const startScan = async (isScan: any) => {
    setBtnScan(isScan);
    stopScan = isScan;

    if (btnScan === false) return;
    await new Promise((r) => setTimeout(r, 100));
    const vidioElement = document.getElementById(
      "scanView"
    ) as HTMLVideoElement;

    const scanner = new QrScanner(
      vidioElement,
      (result: { data: string }) => {
        hasilScan = result.data;
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: (err) => {
          console.error(err);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        returnDetailedScanResult: true,
      }
    );
    await scanner.start();
    while (stopScan === false) {
      await new Promise((r) => setTimeout(r, 100));
    }
    scanner.stop();
    scanner.destroy();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileQrResult = document.getElementById(
      "file-qr-result"
    ) as HTMLInputElement;
    const fileSelector = document.getElementById(
      "file-selector"
    ) as HTMLInputElement;

    const file = fileSelector.files?.[0];

    if (!file) {
      return;
    }

    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      hasilScan = result.data || "No QR code found";
      fileQrResult.textContent = hasilScan;
    } catch (error) {
      hasilScan = error ? error.toString() : "No QR code found";
      fileQrResult.textContent = hasilScan;
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Sqan From cam</h1>
      <div className="flex h-screen justify-center flex-row items-center ">
        {btnScan === false ? (
          <video
            id="scanView"
            className="border border-dotted border-black"
            style={{
              maxWidth: "400px",
              width: "100%",
              maxHeight: "400px",
              height: "100%",
            }}
          ></video>
        ) : (
          ""
        )}
        {btnScan ? (
          <span className="text-center">
            Hasil Scan: <br /> {hasilScan}
          </span>
        ) : (
          ""
        )}

        <div
          className={`${
            btnScan
              ? "bg-blue-500 px-4 py-4 rounded-full"
              : "bg-purple-800 px-4 py-4 rounded-full"
          } fixed bottom-[10px] right-[10px] z-[10000001]`}
          onClick={() => startScan(!btnScan)}
        >
          {btnScan && <Icons.camSqanner className="w-8 h-8" />}
          {btnScan === false && <Icons.stopScanner className="w-8 h-8" />}
        </div>
      </div>

      <h1 className="text-center text-4xl">Scan from file</h1>
      <div className="flex flex-col justify-center items-center mt-10 mb-10">
        <input type="file" id="file-selector" onChange={handleFileChange} />
        <b>Detected Qr code:</b>
        <span id="file-qr-result">None</span>
      </div>
    </div>
  );
};

export default Scanner;
