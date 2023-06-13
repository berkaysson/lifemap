export const animations = {
  pageAnimation : {
    initial:{opacity:0,},
    animate:{opacity:1,},
    exit:{opacity:0,},
  },
  cardAnimation: {
    animate: {opacity: [0,1], transform:["scale(0.9)","scale(1)"]},
    exit:{opacity:0,},
  }
}