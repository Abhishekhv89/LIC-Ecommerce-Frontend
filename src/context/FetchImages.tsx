
export const fetchTshirtImages = async (): Promise<void> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: any[] = await response.json();
    const images: string[] = [];

    data.forEach((item: any) => {
      if (item.category === "men's clothing" || item.category === "women's clothing" && images.length < 19) {
        images.push(String(item.image));
      }
    });

    // fileData.forEach((item, i) => {
    //       if (i < images.length) {
    //         item.img = images[i];
    //       } else {
    //         item.img = images[i-images.length]; // Or handle accordingly if there are not enough images
    //       }
    //     });
    // console.log(fileData);
  } catch (error) {
    console.error('Error fetching T-shirt images:', error);
  }
};
    fetchTshirtImages();