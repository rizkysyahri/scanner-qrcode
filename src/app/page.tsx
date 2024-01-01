"use client";
import Scanner from "@/components/Scanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // const [scanResult, setScanResult] = useState(null);

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //     fps: 5,
  //   },[]);

  //   scanner.render(success, error);

  //   function success(result: any) {
  //     scanner.clear();
  //     setScanResult(result);
  //   }

  //   function error(error: any) {
  //     console.warn(error);
  //   }
  // }, []);

  return (
    <main>
      {/* <h1 className="mt-10 text-4xl">Sqan Barcode coy</h1>
      {scanResult ? (
        <div>
          Success: <Link href={scanResult}>{scanResult}</Link>{" "}
        </div>
      ) : (
        <div id="reader"></div>
      )} */}

      <Scanner />
    </main>
  );
}
