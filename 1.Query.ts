// ======================================
// checking if a data exists:
// ======================================

const emailCount = await this.mongoModelService
                    .getModel<UserDocument>(UserSchema, CollectionEnum.USERS, false)
                    .findOne({ email: userInput.email })
                    .count()
                    .lean();
                if (!!emailCount) {
                    this.exceptionService.exception(HttpStatus.BAD_REQUEST, 'Email already exists!!');
                }


// ======================================
// findOneAndUpdate:
// ======================================

await this.mongoModelService
                .getModel<FileUploadDocument>(FileUploadSchema, CollectionEnum.TEMPORARY_FILES, true, null, true)
                .findOneAndUpdate({url:step1Dto.recentPhotoUrl}, {isUsed:BoolEnum.YES },{new: true}).then((data) =>{
                    if(data === null){
                        this.exceptionService.exception(HttpStatus.BAD_REQUEST, 'Profile picture link is invalid');
                    }
                    console.log("File upload schema updated", data);
                }).catch( (error) => {
                    this.exceptionService.exception(HttpStatus.BAD_REQUEST, 'Something went wrong with the uploaded profile picture');
                    console.log("FileUpload schema could not be updated",error);
                });


