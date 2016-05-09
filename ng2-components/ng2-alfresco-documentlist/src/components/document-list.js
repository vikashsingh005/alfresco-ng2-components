/**
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
System.register(['angular2/core', './../services/alfresco.service', './../models/content-column.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, alfresco_service_1, content_column_model_1;
    var DocumentList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (alfresco_service_1_1) {
                alfresco_service_1 = alfresco_service_1_1;
            },
            function (content_column_model_1_1) {
                content_column_model_1 = content_column_model_1_1;
            }],
        execute: function() {
            DocumentList = (function () {
                function DocumentList(_alfrescoService) {
                    this._alfrescoService = _alfrescoService;
                    this.navigate = true;
                    this.breadcrumb = false;
                    this.itemClick = new core_1.EventEmitter();
                    this.rootFolder = {
                        name: 'Document Library',
                        path: 'swsdp/documentLibrary'
                    };
                    this.currentFolderPath = 'swsdp/documentLibrary';
                    this.route = [];
                    this.actions = [];
                    this.columns = [];
                }
                DocumentList.prototype.canNavigateParent = function () {
                    return this.navigate && !this.breadcrumb &&
                        this.currentFolderPath !== this.rootFolder.path;
                };
                DocumentList.prototype.ngOnInit = function () {
                    this.route.push(this.rootFolder);
                    this.displayFolderContent(this.rootFolder.path);
                };
                DocumentList.prototype.ngAfterContentInit = function () {
                    if (!this.columns || this.columns.length === 0) {
                        this.setupDefaultColumns();
                    }
                };
                DocumentList.prototype.ngAfterViewChecked = function () {
                    // workaround for MDL issues with dynamic components
                    if (componentHandler) {
                        componentHandler.upgradeAllRegistered();
                    }
                };
                DocumentList.prototype.getContentActions = function (target, type) {
                    if (target && type) {
                        var ltarget_1 = target.toLowerCase();
                        var ltype_1 = type.toLowerCase();
                        return this.actions.filter(function (entry) {
                            return entry.target.toLowerCase() === ltarget_1 &&
                                entry.type.toLowerCase() === ltype_1;
                        });
                    }
                    return [];
                };
                DocumentList.prototype.onNavigateParentClick = function ($event) {
                    if ($event) {
                        $event.preventDefault();
                    }
                    if (this.navigate) {
                        this.route.pop();
                        var parent_1 = this.route.length > 0 ? this.route[this.route.length - 1] : this.rootFolder;
                        if (parent_1) {
                            this.displayFolderContent(parent_1.path);
                        }
                    }
                };
                DocumentList.prototype.onItemClick = function (item, $event) {
                    if ($event === void 0) { $event = null; }
                    if ($event) {
                        $event.preventDefault();
                    }
                    this.itemClick.emit({
                        value: item
                    });
                    if (this.navigate && item) {
                        if (item.isFolder) {
                            var path = this.getNodePath(item);
                            this.route.push({
                                name: item.displayName,
                                path: path
                            });
                            this.displayFolderContent(path);
                        }
                    }
                };
                DocumentList.prototype.goToRoute = function (r, $event) {
                    if ($event) {
                        $event.preventDefault();
                    }
                    if (this.navigate) {
                        var idx = this.route.indexOf(r);
                        if (idx > -1) {
                            this.route.splice(idx + 1);
                            this.displayFolderContent(r.path);
                        }
                    }
                };
                DocumentList.prototype.getContentUrl = function (node) {
                    if (this._alfrescoService) {
                        return this._alfrescoService.getContentUrl(node);
                    }
                    return null;
                };
                DocumentList.prototype.getDocumentThumbnailUrl = function (node) {
                    if (this._alfrescoService) {
                        return this._alfrescoService.getDocumentThumbnailUrl(node);
                    }
                    return null;
                };
                DocumentList.prototype.executeContentAction = function (node, action) {
                    if (action) {
                        action.handler(node);
                    }
                };
                DocumentList.prototype.displayFolderContent = function (path) {
                    var _this = this;
                    if (path) {
                        this.currentFolderPath = path;
                        this._alfrescoService
                            .getFolder(path)
                            .subscribe(function (folder) { return _this.folder = folder; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                DocumentList.prototype.getNodePath = function (node) {
                    if (node) {
                        var container = node.location.container;
                        var path = node.location.path !== '/' ? (node.location.path + '/') : '/';
                        var relativePath = container + path + node.fileName;
                        return node.location.site + '/' + relativePath;
                    }
                    return null;
                };
                DocumentList.prototype.setupDefaultColumns = function () {
                    var thumbnailCol = new content_column_model_1.ContentColumnModel();
                    thumbnailCol.source = '$thumbnail';
                    var nameCol = new content_column_model_1.ContentColumnModel();
                    nameCol.title = 'Name';
                    nameCol.source = 'displayName';
                    nameCol.cssClass = 'full-width name-column';
                    this.columns = [
                        thumbnailCol,
                        nameCol
                    ];
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], DocumentList.prototype, "navigate", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], DocumentList.prototype, "breadcrumb", void 0);
                __decorate([
                    core_1.Input('folder-icon'), 
                    __metadata('design:type', String)
                ], DocumentList.prototype, "folderIcon", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentList.prototype, "itemClick", void 0);
                DocumentList = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'alfresco-document-list',
                        styleUrls: ['./document-list.css'],
                        templateUrl: './document-list.html',
                        providers: [alfresco_service_1.AlfrescoService]
                    }), 
                    __metadata('design:paramtypes', [alfresco_service_1.AlfrescoService])
                ], DocumentList);
                return DocumentList;
            }());
            exports_1("DocumentList", DocumentList);
        }
    }
});
//# sourceMappingURL=document-list.js.map