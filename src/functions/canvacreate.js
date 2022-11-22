const { createCanvas, loadImage, canvas } = require('canvas')
const { AttachmentBuilder } = require('discord.js')

module.exports = {
  name: 'canvacreate',
  async execute(humaygahd, canvas) {

    var welcomeCanvas = {};
    welcomeCanvas.create = createCanvas(1024, 500)
    welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
    welcomeCanvas.context.font = '42px san-serif';
    welcomeCanvas.context.fillStyle = '#FFFFFF';

    await loadImage('WELCOMESPLASH IN PNG').then(async (img) => {
      welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
      welcomeCanvas.context.textAlign = 'center';
      welcomeCanvas.context.fillText("Welcome to FurDevs!", 512, 360);
      welcomeCanvas.context.beginPath();
      welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
      welcomeCanvas.context.stroke()
      welcomeCanvas.context.fill()
    })

    let canvas2 = welcomeCanvas;
    canvas2.context.font = '32px san-serif',
      canvas2.context.textAlign = 'center';
    canvas2.context.fillText(humaygahd.user.tag, 512, 410)
    canvas2.context.beginPath()
    canvas2.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas2.context.closePath()
    canvas2.context.clip()
    await loadImage(humaygahd.user.displayAvatarURL({ extension: 'png', size: 1024 }))
      .then(img => {
        canvas2.context.drawImage(img, 393, 47, 238, 238);
      })

    let atta = {}
    atta = new AttachmentBuilder(canvas2.create.toBuffer(), { name: `welcome-${humaygahd.id}.png` })
    return atta

  }
}