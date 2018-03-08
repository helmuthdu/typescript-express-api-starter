import * as Loki from 'lokijs';

export const loadLocalDB = (colName, db: Loki): Promise<Loki.Collection<any>> => {
  return new Promise((resolve: any) => {
    db.loadDatabase({}, () => {
      const collection = db.getCollection(colName) || db.addCollection(colName);
      resolve(collection);
    });
  });
};
