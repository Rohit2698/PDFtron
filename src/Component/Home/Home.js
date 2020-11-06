import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import range from "lodash/range";
import "./Home.css";

export const Home = () => {
  const viewer = useRef(null);
  const [start, setStart] = useState(3);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "/files/test.pdf",
      },
      viewer.current
    ).then((instance) => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();

      docViewer.on("documentLoaded", () => {
        docViewer
          .getDocument()
          .removePages(pdfShow(start, docViewer.getPageCount()))
          .then(() => {});
      });
    });
  }, []);

  const pdfShow = (start, end) => {
    return range(start, end);
  };

  return (
    <>
      <div className="webviewer" ref={viewer}></div>
    </>
  );
};
