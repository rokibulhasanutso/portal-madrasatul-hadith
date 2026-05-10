import React, { useEffect } from "react";
import cn from "../../utils/cn";

const PAGE_DIMENSIONS = {
  A4: { width: 210, height: 297, unit: "mm" },
  A5: { width: 148, height: 210, unit: "mm" },
  Letter: { width: 216, height: 279, unit: "mm" },
  Legal: { width: 216, height: 356, unit: "mm" },
};

// Helper: convert value to CSS unit string
const toCssUnit = (value, defaultUnit = "mm") => {
  if (typeof value === "number") return `${value}${defaultUnit}`;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    const v = value.value ?? 0;
    const u = value.unit ?? defaultUnit;
    return `${v}${u}`;
  }
  return `0${defaultUnit}`;
};

// Helper: resolve padding/margin
const resolveBox = (box = {}, defaultMargin = false) => {
  const unit = box.unit ?? "mm";
  return {
    top: toCssUnit(box.top ?? box.y ?? (defaultMargin ? 0 : 0), unit),
    bottom: toCssUnit(box.bottom ?? box.y ?? (defaultMargin ? 0 : 0), unit),
    left: toCssUnit(box.left ?? box.x ?? (defaultMargin ? "auto" : 0), unit),
    right: toCssUnit(box.right ?? box.x ?? (defaultMargin ? "auto" : 0), unit),
  };
};

export const PrintPage = ({
  children,
  size = "A4",
  orientation = "portrait",
  padding = {},
  margin = {},
  autoPrint = false,
  className = "",
  style = {},
}) => {
  // resolve page size
  const resolvedSize =
    typeof size === "string"
      ? (PAGE_DIMENSIONS[size] ?? PAGE_DIMENSIONS.A4)
      : size;

  const pageWidth =
    orientation === "portrait"
      ? toCssUnit(resolvedSize.width, resolvedSize.unit)
      : toCssUnit(resolvedSize.height, resolvedSize.unit);

  const pageHeight =
    orientation === "portrait"
      ? toCssUnit(resolvedSize.height, resolvedSize.unit)
      : toCssUnit(resolvedSize.width, resolvedSize.unit);

  const resolvedPadding = resolveBox(padding, false);
  const resolvedMargin = resolveBox(margin, true); // default horizontal margin: auto

  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => window.print(), 300);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  return (
    <>
      <div className="print:bg-white py-10 print:p-0 print:break-after-page last:print:break-after-auto">
        <div
          className={cn(
            `
          relative
          mx-auto
          bg-white
          text-black
          shadow-lg
          print:shadow-none
          print:mx-0
        `,
            className,
          )}
          style={{
            width: pageWidth,
            height: pageHeight,
            paddingTop: resolvedPadding.top,
            paddingBottom: resolvedPadding.bottom,
            paddingLeft: resolvedPadding.left,
            paddingRight: resolvedPadding.right,
            marginTop: resolvedMargin.top,
            marginBottom: resolvedMargin.bottom,
            marginLeft: resolvedMargin.left, // default auto
            marginRight: resolvedMargin.right, // default auto
            ...style,
          }}
        >
          {children}
        </div>
      </div>

      {/* <style jsx>{`
        @media print {
          body {
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            margin: 0;
          }
        }
      `}</style> */}
    </>
  );
};
