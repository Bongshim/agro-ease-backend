/* eslint-disable prettier/prettier */
const cloudinary = require('cloudinary');
const config = require('./config');

cloudinary.v2.config({
  cloud_name: config.cloudinary.CLOUD_NAME,
  api_key: config.cloudinary.CLOUDINARY_API_KEY,
  api_secret: config.cloudinary.CLOUDINARY_API_SECRET,
});

// eslint-disable-next-line no-unused-vars
exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        public_id:result.public_id
      });
    });
  });
};

exports.delete = async(file) =>{
//   return new Promise((resolve)=>{
//     cloudinary.uploader.destroy(file,async (result)=>{
//       console.log(result)
//      // eslint-disable-next-line no-return-await
//      resolve(result)
//     })
//   })
 const blue = await cloudinary.uploader.destroy(file);
 console.log(blue);
 return blue;
        
}