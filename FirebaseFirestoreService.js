import { db } from "./FirebaseConfig";
import {
	addDoc,
	doc,
	getDoc,
	collection as firestoreCollection,
	query,
	where,
	orderBy,
	limit,
	startAfter,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

const createDocument = async (collection, document) => {
	return addDoc(firestoreCollection(db, collection), document);
};

const readDocument = (collection, id) => {
	return getDoc(doc(firestoreCollection(db, collection), collection));
};

const readDocuments = async ({
	collection,
	queries,
	orderByField,
	orderByDirection,
	perPage,
	cursorId,
}) => {
	const collectionRef = firestoreCollection(db, collection);

	const queryConstraints = [];

	if (queries && queries.length > 0) {
		for (const query of queries) {
			queryConstraints.push(where(query.filed, query.condition, query.value));
		}
	}
	if (orderByField && orderByDirection) {
		queryConstraints.push(orderBy(orderByField, orderByDirection));
	}
	if (perPage) {
		queryConstraints.push(limit(perPage));
	}
	if (cursorId) {
		const document = await readDocument(collection, cursorId);
		queryConstraints.push(startAfter(document));
	}
	const firestoreQuery = query(collectionRef, ...queryConstraints);

	return getDocs(firestoreQuery);
};

const updateDocument = (collection, id, document) => {
	return updateDoc(doc(firestoreCollection(db, collection), id), document);
};

const deleteDocument = (collection, id) => {
	return deleteDoc(doc(firestoreCollection(db, collection), id));
};

const FirebaseFirestoreService = {
	createDocument,
};

export default FirebaseFirestoreService;
