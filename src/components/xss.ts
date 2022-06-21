export const XSS = (text: any) =>
  JSON.parse(
    JSON.stringify(text)
      .trim()
      .replace(/[\u00A0-\u9999<>&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
      }),
  );
