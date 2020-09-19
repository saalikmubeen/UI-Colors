import chroma from "chroma-js";

// {
//     paletteName: "Flat UI Colors v1",
//     id: "flat-ui-colors-v1",
//     emoji: "🤙",
//     colors: [
//       { name: "Turquoise", color: "#1abc9c" },
//       { name: "Emerald", color: "#2ecc71" },
//       { name: "PeterRiver", color: "#3498db" },
//       { name: "Amethyst", color: "#9b59b6" },
//       { name: "WetAsphalt", color: "#34495e" },
//       { name: "GreenSea", color: "#16a085" },
//       { name: "Nephritis", color: "#27ae60" },
//       { name: "BelizeHole", color: "#2980b9" },
//       { name: "Wisteria", color: "#8e44ad" },
//       { name: "MidnightBlue", color: "#2c3e50" },
//       { name: "SunFlower", color: "#f1c40f" },
//       { name: "Carrot", color: "#e67e22" },
//       { name: "Alizarin", color: "#e74c3c" },
//       { name: "Clouds", color: "#ecf0f1" },
//       { name: "Concrete", color: "#95a5a6" },
//       { name: "Orange", color: "#f39c12" },
//       { name: "Pumpkin", color: "#d35400" },
//       { name: "Pomegranate", color: "#c0392b" },
//       { name: "Silver", color: "#bdc3c7" },
//       { name: "Asbestos", color: "#7f8c8d" }
//     ]
//   },


var levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generateColorPalette(colorPalette){
   var newColorPalette = {};
   newColorPalette.paletteName = colorPalette.paletteName;
   newColorPalette.id = colorPalette.id;
   newColorPalette.emoji = colorPalette.emoji;
   newColorPalette.colors = {};


   for(var level of levels){
       newColorPalette.colors[level] = [];
   }
   
   for(var color of colorPalette.colors){
       var scale = generateScale(color.color, 10).reverse();

       for(var i in scale){
           newColorPalette.colors[levels[i]].push({
               name: `${color.name} ${levels[i]}`,
               id: color.name.toLowerCase().replace(/ /g, "-"),
               hex: scale[i],
               rgb: chroma(scale[i]).css(),
               rgba: chroma(scale[i])
                     .css()
                     .replace("rgb", "rgba")
                     .replace(")", ",1.0)")
           })
       }
   }

   return newColorPalette;

}


function generateRange(hexColor){
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        "#fff"
    ]
}


function generateScale(hexColor, numOfColors){
    return chroma.scale(generateRange(hexColor)).mode("lab").colors(numOfColors);
}


export {generateColorPalette};









// export default chroma.scale(['yellow', 'orange']).mode("lab").colors(6);