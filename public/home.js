'use strict';
const e = React.createElement;

const AppNav = () => (
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Podcasts</a>
  </nav>
);

const Card = ({item, handleSubmit, handleEdit, handleDelete, handleCancel}) => {
  const {title, link, presenter, content, editMode} = item;

  if (editMode) {
    return (
      <div class="card mt-4" Style="width: 100%;">
        <div class="card-body">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={item.pk}/>
            <div class="input-group input-group-sm mb-3">
              <input type="text" name="title" class="form-control" placeholder="Title" defaultValue={title}/>
            </div>
            <div className="input-group input-group-sm mb-3">
              <input type="text" name="link" className="form-control" placeholder="Link" defaultValue={link}/>
            </div>
            <div className="input-group input-group-sm mb-3">
              <input type="text" name="presenter" className="form-control" placeholder="Presenter"
                     defaultValue={presenter}/>
            </div>
            {/*<div class="input-group input-group-sm mb-3">
              <textarea name="content" class="form-control" placeholder="Content" defaultValue={content}></textarea>
            </div>*/}
            <button type="button" class="btn btn-outline-secondary btn-sm" onClick={handleCancel}>Cancel</button>
            <button type="submit" class="btn btn-info btn-sm ml-2">Save</button>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div class="card mt-4" Style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">{title || "No Title"}</h5>
          <a class="card-text" href={link || "No Link"}>{link || "No Link"}</a>
          <p class="card-text">{presenter || "No Presenter"}</p>
          {/*<p class="card-text">{content || "No Presenter"}</p>*/}
          <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
          <button type="submit" class="btn btn-info btn-sm ml-2" onClick={handleEdit}>Edit</button>
        </div>
      </div>
    )
  }
}

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    this.getPodcasts();
  }

  getPodcasts = async () => {
    const response = await fetch('/podcasts');
    const data = await response.json();
    data.forEach(item => item.editMode = false);
    this.setState({data})
  }

  addNewPodcast = () => {
    const data = this.state.data;
    data.unshift({
      editMode: true,
      title: "",
      link: "",
      presenter: "",
      // content: ""
    })
    this.setState({data})
  }

  handleCancel = async () => {
    await this.getPodcasts();
  }

  handleEdit = (podcastId) => {
    const data = this.state.data.map((item) => {
      if (item.pk === podcastId) {
        item.editMode = true;
      }
      return item;
    });
    this.setState({data});
  }

  handleDelete = async (podcastId) => {
    await fetch(`/podcasts/${podcastId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
    await this.getPodcasts();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const body = JSON.stringify({
      title: data.get('title'),
      link: data.get('link'),
      presenter: data.get('presenter'),
      // content: data.get('content'),
    });

    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
    };

    if (data.get('id')) {
      await fetch(`/podcasts/${data.get('id')}`, {
        method: 'PUT',
        headers,
        body,
      });
    } else {
      await fetch('/podcasts', {
        method: 'POST',
        headers,
        body,
      });
    }
    await this.getPodcasts();
  }

  render() {
    return (
      <div>
        <AppNav/>
        <button type="button" class="mt-4 mb-2 btn btn-primary btn-sm " onClick={this.addNewPodcast}>
          Add New Podcast
        </button>
        {
          this.state.data.length > 0 ? (
            this.state.data.map(item =>
              <Card item={item}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit.bind(this, item.pk)}
                    handleDelete={this.handleDelete.bind(this, item.pk)}
                    handleCancel={this.handleCancel}
              />)
          ) : (
            <div class="card mt-5 col-sm">
              <div class="card-body">You don't have any podcasts. Use the "Add New Podcast" button to add some new Podcasts!
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Admin), domContainer);
