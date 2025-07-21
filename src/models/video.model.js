import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFil:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        titel:{
            type:String,
            required:true
        },
        decription:{
               type:String,
            required:true
        },
        duration:{
               type:Number,
            required:true
        },
        views:{
               type:Number,
                default: 0
        },
        isPublishde:{
               type:Boolean,
               default:true
        },

    },{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)