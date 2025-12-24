import { Poppins } from "next/font/google";

// export const theBoldFont = localFont({
//   src: [  
//         {
//           path: '../../../public/fonts/theboldfont.ttf',
//           style: 'normal',
//         },],
//   variable: '--the-bold-font',
//   display: 'swap'
// })

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["italic", "normal"],
    display: "swap",
});