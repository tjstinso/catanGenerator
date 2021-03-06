import { Types } from '../model/Map/CatanMap';


export class MapView {
  constructor(origin, width, map) {
    this.map = map;
    this.width = width;
    this.origin = origin;
    this.pieceHeight = width //* Math.sqrt(3);
  }

  calcX(xOffset) {
    return this.origin.x + xOffset * this.width * 3 / 2
  }

  calcY(xOffset, yOffset) {
    let y = this.origin.y + yOffset * this.width * Math.sqrt(3);
    switch (xOffset) {
      case 0:
        return y
      case 1:
        return y - this.pieceHeight * Math.sqrt(3) / 2
      case 2:
        return y - this.pieceHeight * Math.sqrt(3)
      case 3:
        return y - this.pieceHeight * Math.sqrt(3) * 3 / 2;
      case 4:
        return y - this.pieceHeight * Math.sqrt(3)
      case 5:
        return y - this.pieceHeight *  Math.sqrt(3) / 2;
      case 6:
        return y

    }
  }

  draw(map, context) {
    context.save();
    context.font = `${this.width / 3}px Verdana`;
    let pieces = map.pieces;
    for (let i = 0; i < pieces.length; i++) {

      let y = this.calcX(i);
      let column = pieces[i];
      for (let j = 0; j < column.length; j++) {

        let x = this.calcY(i, j);
        context.fillStyle = this.setColor(column[j].type);

        PieceView.drawHex(context, {x, y}, this.width)
        this.drawDock(context, {x, y}, column[j]);

        if (column[j].number > 0) {
          context.fillStyle = 'white';
          context.beginPath();
          context.arc(x, y, this.width / 3, 0, 2 * Math.PI);
          context.stroke();
          context.fill();

          let num = column[j].number;
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillStyle = num === 6 || num === 8 ? 'red' : 'black';
          context.fillText(column[j].number, x, y);
        }

        if (column[j].type == Types.WATER) {
          this.drawDock(context, {x, y}, column[j]);
        }

      }
    }
    context.restore();
  }

  getDistance(x, y) {
    return Math.sqrt(x*x + y+y);
  }

  drawDock(context, origin, piece) {
    //this.context.save();
    if (piece && piece.dockType) {
      DockView.drawDock(context, origin, this.width, piece.dockType === 1 ? 'white' : this.setColor(piece.dockType), piece.dockDir);
    }
  }

  setColor(type) {
    switch(type) {
      case Types.WHEAT:
        return '#FFD230';
      case Types.SHEEP:
        return '#A9D14E';
      case Types.WOOD:
        return '#39A547';
      case Types.BRICK:
        return '#D67C48';
      case Types.ORE:
        return '#7A7A7A';
      case Types.DESERT:
        return '#FFFDBD';
      case Types.WATER:
        return '#44ABD5';
    }
  }

}

export class PieceView {

  //width is width of leg
  static drawHex(context, origin, width) {
    context.save();
    let ratio = width * Math.sqrt(3) / 2
    let xOff = 3 / 2 * width / 2;
    let offset = ratio * Math.sqrt(3);
    context.beginPath();

    context.moveTo(origin.x, origin.y)
    context.lineTo(origin.x, origin.y - width);

    context.lineTo(origin.x + ratio , origin.y - width / 2);
    context.lineTo(origin.x + ratio, origin.y + width / 2)
    context.lineTo(origin.x, origin.y + width);

    context.lineTo(origin.x - ratio , origin.y + width / 2);
    context.lineTo(origin.x - ratio, origin.y - width / 2)
    context.lineTo(origin.x, origin.y - width);

    context.fill();
    context.restore();
  }

}

class DockView {
  static drawDock(context, origin, width, color, dockDir) {
    context.save();

    context.translate(origin.x, origin.y);
    context.rotate(DockView.calcDir(dockDir) * Math.PI / 180)
    //context.moveTo(origin.x, origin.y);
    context.fillStyle = color;
    context.beginPath();

    const newWidth = 3/4 * width;
    let xDir = newWidth / 2;
    let yDir = newWidth * Math.sqrt(3) / 2
    context.lineTo(xDir, yDir);
    context.lineTo(-xDir, yDir);
    context.lineTo(0, 0);

    context.fill();
    context.restore();

  }

  static calcDir(dir) {
    switch(dir) {
      case "TOP_RIGHT":
        return -150;
      case "TOP_LEFT":
        return 150;
      case "RIGHT":
        return -90;
      case "LEFT":
        return 90;
      case "BOTTOM_RIGHT":
        return -30;
      case "BOTTOM_LEFT":
        return 30;
      default:
        return 0;
    }

  }
}
