import { v4 as uuid } from "uuid";

export const updateDirectory = (updateData) => {
  let isModified = false;

  function updateDir({ directory: tree, id, info }) {
    // info = {
    //  type:create , delete , edit
    //  isFolder:true
    //  name: for create and edit
    // }

    if (tree === null) return null;

    const updateItems = () => {
      return tree.items.map((item) => updateDir({ directory: item, id, info }));
    };

    switch (info.type) {
      case "create": {
        if (isModified) return tree;
        if (tree.id === id && tree.isFolder) {
          tree.items.unshift({
            id: uuid(),
            name: info.name,
            isFolder: info.isFolder,
            items: [],
          });
          isModified = true;
          return tree;
        }
        return { ...tree, items: updateItems() };
      }

      case "delete": {
        if (isModified) return tree;
        if (tree.id === id) {
          return null;
        }
        return { ...tree, items: updateItems() };
      }

      case "edit": {
        if (isModified) return tree;
        if (tree.id === id) {
          tree.name = info.name;
          isModified = true;
          return tree;
        }
        return { ...tree, items: updateItems() };
      }
    }
  }

  console.log(updateData);
  return updateDir(updateData);
};
