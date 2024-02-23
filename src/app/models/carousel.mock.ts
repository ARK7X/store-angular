export const Carousel:Carousel[] = [
    {id: 1, img:'../../../assets/Nuevo-producto-en-el-marketing-Hipernova.jpg', title: 'marketing-Hipernova'},
    {id: 2, img:'../../../assets/cualidades-producto-1200x741.jpg', title: 'cualidades-producto'},
    {id: 3, img:'../../../assets/cartera-de-productos-ejemplos.webp',  title: 'cartera-de-productos'}
]

export interface Carousel  {
    id: number,
    img: string,
    title: string
}