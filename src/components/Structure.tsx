import React, { Component, RefObject, ChangeEvent, FormEvent } from 'react';

interface FormState {
  name: string;
  userTimezone: string;
}

interface FormProps {
  onFormSubmit: (formData: FormState) => void;
}

class Form extends Component<FormProps, FormState> {
  private nameRef: RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);
    this.nameRef = React.createRef<HTMLInputElement>();
    this.state = { name: '', userTimezone: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(): void {
    this.nameRef.current?.focus();
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    this.setState(prevForm => ({ ...prevForm, [name]: value }));
  }

  render(): JSX.Element {
    return (
      <form
        className="Form"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          this.props.onFormSubmit(this.state);
          this.setState({ name: '', userTimezone: '' });
          this.nameRef.current?.focus();
        }}
      >
        <div className="Form-control">
          <label htmlFor="name">Название</label>
          <input
            className="Form-control__name"
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            ref={this.nameRef}
            autoComplete="off"
            required
          />
        </div>
        <div className="Form-control">
          <label htmlFor="user-timezone">Временная зона</label>
          <input
            className="Form-control__user-timezone"
            type="number"
            id="user-timezone"
            name="userTimezone"
            min="-12"
            max="14"
            value={this.state.userTimezone}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button
          className="Form-control__button-add"
          type="submit"
        >
          Добавить
        </button>
      </form>
    );
  }
}

export default Form;