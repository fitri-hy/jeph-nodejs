const fs = require("fs");

class View {
  render(view, data) {
    let content = fs.readFileSync(`./app/views/${view}.dev`, "utf8");

    const layoutPattern = /{{layout "(\w+)"}}/;
    const layoutMatch = content.match(layoutPattern);
    if (layoutMatch) {
      const layoutName = layoutMatch[1];
      let layout = fs.readFileSync(`./app/views/layouts/${layoutName}.dev`, "utf8");
      content = content.replace(layoutPattern, "");
      layout = layout.replace("{{content}}", content);
      content = layout;
    }

    content = content.replace(/{{include "(\w+)"}}/g, (match, partialName) => {
      return fs.readFileSync(`./app/views/partials/${partialName}.dev`, "utf8");
    });

    const foreachPattern = /{{foreach (\w+) as (\w+)}}([\s\S]*?)({{else}}([\s\S]*?))?{{endforeach}}/g;
    content = content.replace(foreachPattern, (match, arrayName, itemName, loopContent, _, elseContent) => {
      if (data[arrayName] && Array.isArray(data[arrayName]) && data[arrayName].length > 0) {
        return data[arrayName].map(item => {
          let processedLoop = loopContent;
          for (const key in item) {
            processedLoop = processedLoop.replace(new RegExp(`{{${itemName}.${key}}}`, "g"), item[key]);
          }
          return processedLoop;
        }).join("");
      }
      return elseContent ? elseContent.trim() : "";
    });

    const ifElsePattern = /{{if (\w+)}}([\s\S]*?){{else}}([\s\S]*?){{endif}}/g;
    content = content.replace(ifElsePattern, (match, condition, trueContent, falseContent) => {
      return data[condition] ? trueContent.trim() : falseContent.trim();
    });

    const ifPattern = /{{if (\w+)}}([\s\S]*?){{endif}}/g;
    content = content.replace(ifPattern, (match, condition, innerContent) => {
      return data[condition] ? innerContent.trim() : "";
    });

    for (const key in data) {
      if (typeof data[key] === "string" || typeof data[key] === "number") {
        content = content.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
      }
    }

    return content;
  }
}

module.exports = View;
