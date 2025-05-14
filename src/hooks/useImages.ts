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
      const optimizedUrl = result.secure_url.replace(
        "/upload/",
        "/upload/w_600,f_auto,q_auto/"
      );
      const image = optimizedUrl;

      // faz upload das imagens extras
      const moreImages: string[] = [];

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
            const optimizedUrl = moreImagesResult.secure_url.replace(
              "/upload/",
              "/upload/w_600,f_auto,q_auto/"
            );
            moreImages.push(optimizedUrl);
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
