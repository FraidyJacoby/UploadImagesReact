import React from 'react';
import axios from 'axios';
import produce from 'immer';
import 'bootstrap/dist/js/bootstrap.js';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

class UploadImage extends React.Component {

    fileRef = React.createRef();

    state = {
        categories: [],
        subcategories: [],
        categorySelected: false,
        categoryTitle: '',
        subcategoryTitle: '',
        uploadedImage: {
            categoryId: '',
            subcategoryId: '',
            description: ''
        },
        imageIncomplete: true
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/categories/getallcategories');
        this.setState({ categories: data });
    }

    onCategorySelect = async category => {
        const { data } = await axios.get(`/api/categories/getsubcategories/${category.id}`);
        const nextState = produce(this.state, draft => {
            draft.subcategories = data;
            draft.categorySelected = true;
            draft.categoryTitle = category.title;
            draft.uploadedImage.categoryId = category.id;
        })
        this.setState(nextState, () => {
            this.verifyImageComplete();
        })
    }

    onSubcategorySelect = subcategory => {
        const nextState = produce(this.state, draft => {
            draft.subcategoryTitle = subcategory.title;
            draft.uploadedImage.subcategoryId = subcategory.id;
        })
        this.setState(nextState, () => {
            this.verifyImageComplete();
        })
    }

    onDescriptionChange = e => {
        const nextState = produce(this.state, draft => {
            draft.uploadedImage.description = e.target.value;
        })

        this.setState(nextState, () => {
            this.verifyImageComplete();
        })
    }

    verifyImageComplete = () => {
        console.log(this.fileRef.current.files[0]);
        if (this.fileRef.current.files[0] === undefined ||
            this.state.uploadedImage.categoryId === '' ||
            this.state.uploadedImage.subcategoryId === '' ||
            this.state.uploadedImage.description === '') {
            this.setState({ imageIncomplete: true });
        }
        else {
            this.setState({ imageIncomplete: false });
        }
    }

    onFileChange = () => {
        this.verifyImageComplete();
    }

    onUpload = async () => {
        const file = this.fileRef.current.files[0];
        const base64File = await toBase64(file);
        const vm = {
            fileName: file.name,
            description: this.state.uploadedImage.description,
            categoryId: this.state.uploadedImage.categoryId,
            subcategoryId: this.state.uploadedImage.subcategoryId,
            base64File
        }
        await axios.post('/api/uploads/addfile', vm);

        this.setState({
            categorySelected: false,
            categoryTitle: '',
            subcategoryTitle: '',
            uploadedImage: {
                categoryId: '',
                subcategoryId: '',
                description: ''
            }
        })
        this.fileRef.current.value = '';
    }

    render() {
        const { onCategorySelect, onSubcategorySelect, fileRef, onDescriptionChange, onUpload, onFileChange } = this;
        const { categories, subcategories, categorySelected, categoryTitle, subcategoryTitle, imageIncomplete } = this.state;
        const { description } = this.state.uploadedImage;

        return (
            <>
                <div className="row">
                    <div className="dropdown" style={{ marginBottom: 20, marginRight: 10 }}>
                        <button className="btn btn-info dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Select a category</button>
                        <div className="dropdown-menu">
                            {categories.map(category =>
                                <button className="dropdown-item" key={category.id}
                                    onClick={() => onCategorySelect(category)}>
                                    {category.title}
                                </button>
                            )}
                        </div>
                    </div>
                    <h4>{categoryTitle}</h4>
                </div>

                {categorySelected &&
                    <div className="row">
                        <div className="dropdown" style={{ marginBottom: 20, marginRight: 10 }}>
                            <button className="btn btn-info dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Select a subcategory</button>
                            <div className="dropdown-menu">
                                {subcategories.map(subcategory =>
                                    <button className="dropdown-item" key={subcategory.id}
                                        onClick={() => onSubcategorySelect(subcategory)}>
                                        {subcategory.title}
                                    </button>
                                )}
                            </div>
                        </div>
                        <h4>{subcategoryTitle}</h4>
                    </div>
                }

                <input type="file" ref={fileRef} className="form-control" onChange={onFileChange} />
                <input type="text" value={description} onChange={onDescriptionChange}
                    className="form-control" placeholder="description" />
                <button className="btn btn-outline-success" onClick={onUpload} disabled={imageIncomplete}>upload</button>
            </>
        )
    }
}

export default UploadImage;