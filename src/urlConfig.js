export const api = 'http://localhost:2000/api';
export const generalPublicUrl = (filename)=>{
    console.log('>>>>filename',filename)
    return `http://localhost:2000/public/${filename}`
}