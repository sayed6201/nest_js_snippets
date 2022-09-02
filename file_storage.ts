//============================================
    //storing file as a string in the database
//============================================
async function saveFile(file: Express.Multer.File){
    //Convert the file to base64 string
    const fileB64 = file.buffer.toString('base64')
    
    //userModel is a mongoose model
    
    //Store the string
    await this.userModel.create({file: fileB64})
}
    
    
async function getFile(userId: string){
    
    //Get user from database
    const user = await this.userModel.findOne({_id: userId}).lean()
    if(!user) throw new NotFoundException('User not found')
    
    const file = user.file
    
    //Convert the string to buffer
    return Buffer.from(file, 'base64')
}