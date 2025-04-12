import { IPetImage } from "../interfaces/Pet";

export const useImages = () => {
  // upa as imagens no banco de dados, tanto a imagem principal quanto as imagens extras (se houver)
  const uploadImages = async (
    imageData: FormData | null,
    moreImagesData: FormData[] | null
  ) => {
    try {
        
      if (!imageData || !moreImagesData) return;


      // faz upload da imagem principal
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djzmzwwtm/image/upload",
        {
          method: "POST",
          body: imageData,
        }
      );

      const result = await res.json();
      const image: IPetImage = { url: result.url, id: result.public_id };

      // faz upload das imagens extras
      const moreImages: IPetImage[] = [];

      await Promise.all(
        moreImagesData.map(async (data) => {
          try {
            const moreImagesRes = await fetch(
              "https://api.cloudinary.com/v1_1/djzmzwwtm/image/upload",
              {
                method: "POST",
                body: data,
              }
            );

            const moreImagesResult = await moreImagesRes.json();
            moreImages.push({
              url: moreImagesResult.url,
              id: moreImagesResult.public_id,
            });
          } catch (error) {
            throw new Error("Erro no upload das imagens.");
          }
        })
      );

      return { image, moreImages };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return { uploadImages };
};
