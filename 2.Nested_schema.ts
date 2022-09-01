// ======================================================
// ======================================================
//              Nest js Relational Schema 
// ======================================================
// ======================================================


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { CarehomeEntity, UserEntity } from '@packages/schemas';
import { Transform } from 'class-transformer';

// ======================================================
// Step - 1
// ======================================================
@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class JobApplicationStep1Entity {
    @Prop({ type: SchemaTypes.ObjectId, ref: CarehomeEntity.name, required: true })
    carehome: Types.ObjectId;

    @Prop({ type: SchemaTypes.String, required: true })
    position: string;

    @Prop({ type: SchemaTypes.String, required: true })
    jobType: string;

    @Prop({ type: SchemaTypes.String, required: true })
    title: string;

    @Prop({ type: SchemaTypes.String, required: true })
    firstName: string;

    @Prop({ type: SchemaTypes.String, required: false })
    middleName: string;

    @Prop({ type: SchemaTypes.String, required: true })
    lastName: string;

    @Prop({ type: SchemaTypes.Boolean, required: false, default: false })
    nameChanged: boolean;

    @Prop({ type: SchemaTypes.String, required: false })
    nameChangeReason: string;

    @Prop({ type: SchemaTypes.String, required: false, default: null })
    phone: string;

    @Prop({ type: SchemaTypes.String, required: false, default: null })
    email: string;

    @Prop({ type: SchemaTypes.Date, required: true })
    dob: Date;

    @Prop({ type: SchemaTypes.String, required: true })
    cityOfBirth: string;

    @Prop({ type: SchemaTypes.String, required: true })
    countryOfBirth: string;

    @Prop({ type: SchemaTypes.String, required: true })
    nationality: string;

    @Prop({ type: SchemaTypes.String, required: true })
    mothersMiddleName: string;

    @Prop({ type: SchemaTypes.Boolean, required: true })
    rightToWorkInUk: boolean;
}

const JobApplicationStep1Schema = SchemaFactory.createForClass(JobApplicationStep1Entity);

type JobApplicationStep1Document = JobApplicationStep1Entity & Document;

// ======================================================
// Step - 2
// ======================================================
@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class AddressHistoryEntity {
    @Prop({ type: SchemaTypes.String, required: true })
    address: string;

    @Prop({ type: SchemaTypes.String, required: true })
    postCode: string;

    @Prop({ type: SchemaTypes.Date, required: true })
    fromDate: Date;

    @Prop({ type: SchemaTypes.Date, required: true })
    toDate: Date;
}

const AddressHistorySchema = SchemaFactory.createForClass(AddressHistoryEntity);

type AddressHistoryDocument = AddressHistoryEntity & Document;

@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class JobApplicationStep2Entity {
    @Prop({ type: SchemaTypes.String, required: true })
    currentAddress: string;

    @Prop({ type: SchemaTypes.String, required: true })
    postCode: string;

    @Prop({ type: SchemaTypes.Date, required: true })
    fromDate: Date;

    @Prop({ type: [AddressHistorySchema] })
    addressHistory: [AddressHistoryEntity];
}

const JobApplicationStep2Schema = SchemaFactory.createForClass(JobApplicationStep2Entity);

type JobApplicationStep2Document = JobApplicationStep2Entity & Document;

// ======================================================
// Step - 3
// ======================================================
@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class JobApplicationStep3Entity {
    @Prop({ type: SchemaTypes.Number, required: true })
    unplannedAbsent: number;

    @Prop({ type: SchemaTypes.String, required: false })
    detailOfAbsence: string;

    @Prop({ type: SchemaTypes.Boolean, required: true })
    disabilityOrInjury: boolean;

    @Prop({ type: SchemaTypes.String, required: false })
    explainDisabilityOrInjury: string;
}
const JobApplicationStep3Schema = SchemaFactory.createForClass(JobApplicationStep3Entity);
type JobApplicationStep3Document = JobApplicationStep3Entity & Document;

// ======================================================
// Step - 4
// ======================================================
@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class EmploymentHistoryEntity {
    @Prop({ type: SchemaTypes.String, required: true })
    employmentStatus: string;

    @Prop({ type: SchemaTypes.String, required: true })
    employerOrSchoolOrUniversityAttended: string;

    @Prop({ type: SchemaTypes.Date, required: true })
    fromDate: Date;

    @Prop({ type: SchemaTypes.Date, required: true })
    toDate: Date;
}

const EmploymentHistorySchema = SchemaFactory.createForClass(EmploymentHistoryEntity);

type EmploymentHistoryDocument = EmploymentHistoryEntity & Document;

@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class JobApplicationStep4Entity {
    @Prop({ type: SchemaTypes.String, required: true })
    employmentStatus: string;

    @Prop({ type: SchemaTypes.String, required: true })
    employerOrSchoolOrUniversityAttended: string;

    @Prop({ type: SchemaTypes.Date, required: true })
    fromDate: Date;

    @Prop({ type: [EmploymentHistorySchema] })
    employmentHistory: [EmploymentHistoryEntity];

    @Prop({ type: SchemaTypes.String, required: false })
    relevantQualificationOrExperience: string;
}

const JobApplicationStep4Schema = SchemaFactory.createForClass(JobApplicationStep4Entity);

type JobApplicationStep4Document = JobApplicationStep4Entity & Document;

// ======================================================
// Step - 5
// ======================================================
@Schema({
    _id: false,
    versionKey: false,
    timestamps: false,
})
class JobApplicationStep5Entity {
    @Prop({ type: SchemaTypes.Boolean, required: true })
    everConvicted: boolean;

    @Prop({ type: SchemaTypes.String, required: false })
    convictionDetail: string;

    @Prop({ type: SchemaTypes.Boolean, required: true })
    dismissedOrSuspendedForPendingCase: boolean;

    @Prop({ type: SchemaTypes.String, required: false })
    pendingCaseDetail: string;
}
const JobApplicationStep5Schema = SchemaFactory.createForClass(JobApplicationStep5Entity);
type JobApplicationStep5Document = JobApplicationStep5Entity & Document;

// ======================================================
// Parent Schema
// ======================================================
@Schema({
    timestamps: true,
    versionKey: false,
})
class JobApplicationEntity {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ type: SchemaTypes.Date, default: null })
    deletedAt: Date | null;

    @Prop({ type: SchemaTypes.ObjectId, ref: UserEntity.name })
    createdBy: Types.ObjectId | null;

    @Prop({ type: SchemaTypes.ObjectId, ref: UserEntity.name })
    updatedBy: Types.ObjectId | null;

    @Prop({ type: JobApplicationStep1Schema })
    jobApplicationStep1: JobApplicationStep1Entity;

    @Prop({ type: JobApplicationStep2Schema })
    jobApplicationStep2: JobApplicationStep2Entity;

    @Prop({ type: JobApplicationStep3Schema })
    jobApplicationStep3: JobApplicationStep3Entity;

    @Prop({ type: JobApplicationStep4Schema })
    jobApplicationStep4: JobApplicationStep4Entity;

    @Prop({ type: JobApplicationStep5Schema })
    jobApplicationStep5: JobApplicationStep5Entity;
}

const JobApplicationSchema = SchemaFactory.createForClass(JobApplicationEntity);

type JobApplicationDocument = JobApplicationEntity & Document;

export {
    JobApplicationEntity,
    JobApplicationSchema,
    JobApplicationDocument,
    JobApplicationStep1Entity,
    JobApplicationStep1Schema,
    JobApplicationStep1Document,
    JobApplicationStep2Entity,
    JobApplicationStep2Schema,
    JobApplicationStep2Document,
    AddressHistoryEntity,
    AddressHistorySchema,
    AddressHistoryDocument,
    JobApplicationStep3Entity,
    JobApplicationStep3Schema,
    JobApplicationStep3Document,
    EmploymentHistoryEntity,
    EmploymentHistorySchema,
    EmploymentHistoryDocument,
    JobApplicationStep4Entity,
    JobApplicationStep4Schema,
    JobApplicationStep4Document,
    JobApplicationStep5Entity,
    JobApplicationStep5Schema,
    JobApplicationStep5Document,
};
