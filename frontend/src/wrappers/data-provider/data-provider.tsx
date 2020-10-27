import React, { Component, ReactNode } from 'react';
import { ENTITY_TYPES, REQUEST_METHODS } from '../../common/consts';
import { HttpService } from '../../common/http-service/http-service';
import { MODELS } from '../../common/models';

const http = HttpService.getInstance();

interface DataProviderProps {
  entityType: ENTITY_TYPES;
  requestBody?: any;
  children(childData: any): ReactNode;
}

interface DataProviderState {
  childData: any;
}

export class DataProvider extends Component<DataProviderProps, DataProviderState> {
  // TODO: dependencyData w stacie
  public state = { childData: null };
  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = () => {
    const { entityType, requestBody } = this.props;

    switch (MODELS[entityType].requestMethod) {
      case REQUEST_METHODS.GET:
        http.get(MODELS[entityType].url).then(result => {
          this.setState({ childData: result });
        });
      case REQUEST_METHODS.POST:
        http.post(MODELS[entityType].url, undefined, JSON.stringify(requestBody)).then(result => {
          this.setState({ childData: result });
        });
    }
  };

  public render = () => {
    return this.props.children(this.state);
  };
}
