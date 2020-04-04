/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// Apply spectrum typography tags to HTML (e.g. from rendered Markdown)

import matchHelper from 'posthtml-match-helper';

const load = (files = [], method = 'preload', type = 'script') => {
    return function (tree) {
        tree.match(matchHelper('head'), (node) => {
            const fileNodes = files.map((file) => ({
                tag: 'link',
                attrs: {
                    rel: method,
                    href: file,
                    as: type,
                },
            }));
            return {
                ...node,
                content: [...node.content, ...fileNodes],
            };
        });
        return tree;
    };
};

export default load;
export const preload = (files) => load(files, 'preload');
export const modulepreload = (files) => load(files, 'modulepreload');
export const prefetch = (files) => load(files, 'prefetch');
