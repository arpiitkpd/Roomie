import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // post
    async createPost({ owner, featuredPictures, roomates, Gender, rent,address,status, userId, from , to, residential, roomsAllocated, condition}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    owner, featuredPictures, roomates, Gender, rent,address,status, userId, from , to, residential, roomsAllocated, condition

                }
            )
        } catch (error) {
            console.log("Appwrite service: createPost :: error", error);
            
        }

    }

    
    async getUserById(userId, queries=[Query.equal("userId", userId)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("appwrite service:: getUser:: error");
            
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("appwrite service:: getPost:: error", error);
            
        }
    }

    async getPostById(id){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id)
        } catch (error) {
            console.log("appwrite service :: getPostbyId :: error");
            
        }
    }

    async getpostByUser(query ,queries = [Query.contains("userId",query)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("appwrite service:: getPost:: error", error);
            
        }
    }

    async deletePost(id){
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id)
        } catch (error) {
            console.log("appwrite service :: deletePost :: error");
            
        } 
    }

    async updatePost(slug,{ owner, featuredPictures, roomates, Gender, rent,address,status, userId, from , to, residential, roomsAllocated, condition}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    owner, featuredPictures, roomates, Gender, rent,address,status, userId, from , to, residential, roomsAllocated, condition

               
                }
            )
        } catch (error) {
            console.log("appwrite service: updatePOst : error", error);
            
        }

    }

    async seachPost(query ,queries = [Query.contains("address", query )]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("appwrite service:: getPost:: error", error);
            
        }
    }

    // storage services
    async uploadFile(file){
        try {
            return this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("appwrite service :: uploadfile() :: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
             return true;
        } catch (error) {
            console.log("appwrite service :: deletefile() :: ", error);
            return false;
        }
    }

    // get file  preview
    getFilePreview(fileId){
        
            return  this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    }

    //  profile 
    async createProfile({name, userId, gender, age, bio, profilePicture}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                ID.unique(),
                {
                    name, 
                    gender,
                    userId,
                    age,
                    bio,
                    profilePicture

                }
            )
        } catch (error) {
            console.log("Appwrite service: createProfle:: error", error);
            
        }

    }

    async getProfileById(userId,queries = [Query.contains("userId",userId)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteProfileCollectionId,queries)
        } catch (error) {
            console.log("appwrite service :: getProfilebyId :: error", error);
            
        }
    }
    
   

}

const appwriteService = new Service();
export default appwriteService;