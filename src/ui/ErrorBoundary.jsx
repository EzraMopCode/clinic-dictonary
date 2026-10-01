import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-box" role="alert">
          <h2 style={{ margin: '0 0 0.5rem 0' }}>System Error</h2>
          <p style={{ marginBottom: '1.5rem' }}>{this.state.error.message || "This part of the application couldn't load."}</p>
          <button className="btn btn-primary" onClick={() => this.setState({ error: null })}>Restart Component</button>
        </div>
      );
    }
    return this.props.children;
  }
}
