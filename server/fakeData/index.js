export default {
    authors:[
        {
            id:123,
            name: 'Kaiser'
        },
        {
            id:999,
            name: 'Huy'
        }
    ],
    folders: [
        {
            id: "1",
            name: "home",
            createAt: "2023-07-18T03:42:13Z",
            authorId: 123
        },
        {
            id: "2",
            name: "new folder",
            createAt: "2023-07-18T03:42:13Z",
            authorId: 999
        },
        {
            id: "3",
            name: "work",
            createAt: "2023-07-18T03:42:13Z",
            authorId: 123
        },
    ],
    notes:[
        {
            id:"123",
            content:"<p>Go to the supermarket</p>",
            folderId:"1"
        },
        {
            id:"234",
            content:"<p>Go to the park</p>",
            folderId:"1"
        },
        {
            id:"123",
            content:"<p>Go to the store</p>",
            folderId:"2"
        },
    ]
};
