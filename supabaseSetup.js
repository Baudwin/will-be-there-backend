const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.SUPABASE_KEY
const supabase  = require('@supabase/supabase-js').createClient(supabaseUrl, supabaseKey)


// const client = supabase.createClient(supabaseUrl, supabaseKey)
// console.log(supabase.createClient)

const uploadFunction = async(fileName, fileBuffer, mimetype)=>{
    try {
        const { data, error } = await supabase.storage.from('eventimages').upload(fileName,fileBuffer, {
          contentType: mimetype,
          cacheControl: '3600',
        }); 
        if (error) {
            throw error
        }     
        return data
      } catch (error) {
        throw error
      }
}


module.exports = uploadFunction