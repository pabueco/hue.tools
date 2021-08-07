import nearestColor from 'nearest-color';
import colorNamesList from 'color-name-list/dist/colornames.bestof.esm';

// nearestColor need objects {name => hex} as input
const colors = colorNamesList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colors);

console.log("exec");


export { nearest }
