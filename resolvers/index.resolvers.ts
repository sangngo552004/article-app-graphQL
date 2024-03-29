import {resolversArticle} from "./article.resolvers";
import {resolversCategory} from "./category.resolves";
import {resolversUser} from "./user.resolvers";

export const resolvers = [resolversArticle, resolversCategory, resolversUser];