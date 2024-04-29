
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = () => createClient(supabaseUrl, supabaseKey);

console.log(supabaseUrl)

const uploadFunction = async(fileName, fileBuffer, mimetype)=>{
    try {
        const { data, error } = await supabase().storage.from('eventimages').upload(fileName,fileBuffer, {
          contentType: mimetype,
          cacheControl: '3600',
        }); 
        if (error) {
          console.log(error)
            throw error
           
        }     
        return data
      } catch (error) {
        console.log(error)
        throw error
      }
}


module.exports = uploadFunction