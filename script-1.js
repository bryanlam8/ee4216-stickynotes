var app = new Vue( {
    el: '#app',
    data: {
        LoginStatus: '',
        MyToken: '',
        MyTokenpw: '',        
        AddContent: '',
        EditContent: '',
        EditId: '',
        isEdit: false,
        Notes: [],

    },

    methods: {
        CreateUser: async function() {
            await fetch('http://54.172.67.50:8080/api/NewUser', {
            method: 'POST',
            body: JSON.stringify({
                "username": document.getElementById("uname").value,
                "password": document.getElementById("pw").value
            }),
            headers: {}
            })
            .then(res => res.text())
            .then(data => this.LoginStatus = data)            
            this.MyToken = '';
        },

        ViewNote: async function() {
            await fetch('http://54.172.67.50:8080/api/memo', {
                method: 'POST',
                body: JSON.stringify({
                    "token": this.MyToken,
                    "tokenpw": this.MyTokenpw
                }),
                headers: {}
            })            
            .then(res => res.json())
            .then(data => this.Notes = data)
        },

        UserLogin: async function() {
            await fetch('http://54.172.67.50:8080/api/GetMyToken', {
                method: 'POST',
                body: JSON.stringify({
                    "username": document.getElementById("uname").value,
                    "password": document.getElementById("pw").value
                }),
                headers: {}
            })
            .then(res => res.text())
            .then(data => this.MyToken = data)
            this.CreateStatus = '';
            this.ViewNote();         
        },

        GetTokenpw: async function() {
            fetch('http://54.172.67.50:8080/api/GetMyTokenpw', {
                method: 'POST',
                body: JSON.stringify({
                    "username": document.getElementById("uname").value,
                    "password": document.getElementById("pw").value
                }),
                headers: {}
            })
            .then(res => res.text())
            .then(data => this.MyTokenpw = data)
            .then(console.log)
        },
        //--------------------------------------------------------

        

        AddNote: async function() {
            if (this.AddContent == '') {
                alert("Empty Note Content");
                return;
            }
            await fetch('http://54.172.67.50:8080/api/postMemo', {
                method: 'POST',
                body: JSON.stringify({
                    "id": "",
                    "token": this.MyToken,
                    "content" : this.AddContent
                }),
                headers: {}
            })
            .then(res => res.text())
            this.AddContent = '';
            this.ViewNote();
        },

        

        DeleteNote: async function(DelId) {
            if (this.isEdit && this.EditContent == '') {
                return;
            }
            
            await fetch('http://54.172.67.50:8080/api/deleteMemo', {
                method: 'POST',
                body: JSON.stringify({
                    "id": DelId.toString(),
                    "token": this.MyToken,
                    "tokenpw": this.MyTokenpw
                }),
                headers: {}
        })
        .then(res => res.text())
        this.ViewNote();
        },

        

        EditNote: async function(id) {
            if (this.isEdit) {
                alert("You haven't saved the previous note");
                return;
                this.EditContent = '';
            }
            this.isEdit = true;            
            this.EditId = id.toString();                      
        },

        UpdateNote: async function(UpdateId) {
            if (this.EditContent == '') {
                this.isEdit = false;
                this.EditId = '';
                return;
            }
            this.EditId = '';
            this.isEdit = false;
            await fetch('http://54.172.67.50:8080/api/updateMemo', {
                method: 'POST',
                body: JSON.stringify({
                    "id": UpdateId.toString(),
                    "token": this.MyToken,
                    "content": this.EditContent,
                    "tokenpw": this.MyTokenpw
                }),
                headers: {}
            })
            .then(res => res.text())
            this.EditContent = '';
            this.ViewNote();
        }

    }
})


