/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MinimalNodeEntity, MinimalNodeEntryEntity } from 'alfresco-js-api';
export declare class NodePaging {
    list: NodePagingList;
}
export declare class NodePagingList {
    pagination: Pagination;
    entries: NodeMinimalEntry[];
}
export declare class NodeMinimalEntry implements MinimalNodeEntity {
    entry: NodeMinimal;
}
export declare class Pagination {
    count: number;
    hasMoreItems: boolean;
    totalItems: number;
    skipCount: number;
    maxItems: number;
}
export declare class NodeMinimal implements MinimalNodeEntryEntity {
    id: string;
    parentId: string;
    name: string;
    nodeType: string;
    isFolder: boolean;
    isFile: boolean;
    modifiedAt: Date;
    modifiedByUser: UserInfo;
    createdAt: Date;
    createdByUser: UserInfo;
    content: ContentInfo;
    path: PathInfoEntity;
    properties: NodeProperties;
}
export declare class UserInfo {
    displayName: string;
    id: string;
}
export declare class ContentInfo {
    mimeType: string;
    mimeTypeName: string;
    sizeInBytes: number;
    encoding: string;
}
export declare class PathInfoEntity {
    elements: PathElementEntity;
    isComplete: boolean;
    name: string;
}
export declare class PathElementEntity {
    id: string;
    name: string;
}
export interface NodeProperties {
    [key: string]: any;
}
