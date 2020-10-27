import React, { Component, ReactNode } from 'react';
import { ENTITY_TYPES, REQUEST_METHODS } from '../../common/consts';
import { HttpService } from '../../common/http-service/http-service';
import { MODELS } from '../../common/models';
import { isEmpty } from '../../common/helpers';

const http = HttpService.getInstance();

interface DataProviderProps {
  entityType: ENTITY_TYPES;
  requestBody?: any;
  children(childData: any): ReactNode;
}

interface DataProviderState {
  entityData: any;
  dependenciesData?: { entityType: ENTITY_TYPES; result: any }[];
}

export class DataProvider extends Component<DataProviderProps, DataProviderState> {
  public state = { entityData: null, dependenciesData: [] };

  public componentDidMount() {
    this.fetchData();
    this.fetchDependencies();
  }

  private fetchData = () => {
    const { entityType, requestBody } = this.props;

    switch (MODELS[entityType].requestMethod) {
      case REQUEST_METHODS.POST:
        http.post(MODELS[entityType].url, undefined, JSON.stringify(requestBody)).then(result => {
          this.setState({ entityData: result });
        });
        break;
      default:
        http.get(MODELS[entityType].url).then(result => {
          this.setState({ entityData: result });
        });
    }
  };

  private fetchDependencies = () => {
    const { entityType } = this.props;
    const { dependencies } = MODELS[entityType];

    if (!isEmpty(dependencies)) {
      /* eslint-disable */
      dependencies?.forEach(dependency => {
        const { entityType: dependencyEntityType } = dependency;
        const { dependenciesData } = this.state;
        const requestBody = null;

        switch (MODELS[dependencyEntityType].requestMethod) {
          case REQUEST_METHODS.POST:
            http.post(MODELS[dependencyEntityType].url, undefined, JSON.stringify(requestBody)).then(result => {
              this.setState({
                dependenciesData: [...dependenciesData, { entityType: dependencyEntityType, result }],
              });
            });
            break;
          default:
            http.get(MODELS[dependencyEntityType].url).then(result => {
              this.setState({
                dependenciesData: [...dependenciesData, { entityType: dependencyEntityType, result }],
              });
            });
        }
      });
    }
  };

  public render = () => {
    const { children } = this.props;
    return children(this.state);
  };
}
