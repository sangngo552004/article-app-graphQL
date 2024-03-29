import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        getListArticle : async (_, args) => {
            const {sortKey , sortValue , currentPage , limitItems, filterKey, filterValue, keyword} = args;
            //sort
            const sort  = {};
            if(sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            //end sort

            //pagination
            const skipItems = (currentPage - 1) * limitItems;
            //end pagination

            //filter
            const find = {
                deleted : false
            };
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            //end filter

            //Search
            if (keyword) {
                const result = new RegExp(keyword, "i");
                find["title"] = result
            }
            //end Search
            const articles = await Article.find(find).sort(sort).limit(limitItems).skip(skipItems);

            return articles;
        }
    },
    Article: {
        category: async (article) => {
            const {categoryId} = article;
            
            const category = await Category.findOne({
                _id : categoryId
            });
            return category;
        }
    },
    Mutation: {
        createArticle: async (_, args) => {
            const {article} = args;

            const record = new Article(article);
            await record.save();
            return record;
        },
        deleteArticle: async (_, args) => {
            const { id } = args;
            
            await Article.updateOne({
                _id : id
            }, {
                deleted : true,
                deletedAt : new Date()
            });

            return "Đã xóa!";
        },
        updateArticle : async (_, args) => {
            const { id , article} = args;

            await Article.updateOne({
                _id : id
            },article);

            const newData = await Article.findOne({
                _id : id
            });
            
            return newData
        },
    }
    
}