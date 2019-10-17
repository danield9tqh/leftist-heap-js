const merge = (root1, root2) => {
	if(root2 == null && root1 == null) return null;
	if(root1 == null) return root2;
	if(root2 == null) return root1;

	const [subTree1, subTree2, newVal] = (root1.val < root2.val)
		? [root1.left, merge(root2, root1.right), root1.val]
		: [root2.left, merge(root1, root2.right), root2.val]

	const subTree1Dist = subTree1 ? subTree1.dist : 0;
	const subTree2Dist = subTree2 ? subTree2.dist : 0;
	const [newLeft, newRight, newDist] = subTree1Dist > subTree2
		? [subTree1, subTree2, subTree2Dist + 1]
		: [subTree2, subTree1, subTree1Dist + 1]

	return {
		val: newVal,
		left: newLeft,
		right: newRight,
		dist: newDist
	}
}

const takeMin = (root) => {
	return [root.val, merge(root.left, root.right)];
}

const insert = (root, val) => {
	const newNode = {
		val,
		left: null,
		right: null,
		dist: 1
	}
	return merge(root, newNode);
}

const heapSort = (list) => {
	const heapRoot = list.reduce((currHeapRoot, nextValue) => {
		return insert(currHeapRoot, nextValue);
	}, null);

	return heapToSortedList(heapRoot);
}

const heapToSortedList = (root) => {
	if (root == null) return [];
	[min, newHeapRoot] = takeMin(root);
	return [min].concat(heapToSortedList(newHeapRoot));
}

const random = () => Math.floor(Math.random() * 1000);

const randomArray = [...new Array(100)].map(random);

console.log(heapSort(randomArray))





