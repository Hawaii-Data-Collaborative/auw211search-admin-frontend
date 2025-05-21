import axios from 'axios'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  CardContent,
  CardActions,
  Typography,
  Stack,
  CircularProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SyncIcon from '@mui/icons-material/Sync'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import RemoveIcon from '@mui/icons-material/Remove'
import { useController } from 'react-hook-form'
import dayjs from 'dayjs'
import {
  BooleanInput,
  EditContextProvider,
  NumberInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  Title,
  Toolbar,
  useNotify,
  useRecordContext
} from 'react-admin'

import { API_URL } from '../constants'

import './Settings.scss'

export function Settings() {
  const notify = useNotify()
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios
      .get(API_URL + '/settings')
      .then(res => {
        setSettings(res.data)
      })
      .catch(err => {
        notify(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async data => {
    try {
      setSaving(true)
      const cleanData = _.cloneDeep(data)
      if (cleanData.trends) {
        cleanData.trends = cleanData.trends.map(t => t.text)
      }
      const res = await axios.post(API_URL + '/settings', cleanData)
      setSettings(res.data)
      setTimeout(() => setSaving(false), 1500)
      notify('Saved')
    } catch (err) {
      setSaving(false)
      notify(err.message)
    }
  }

  if (!settings) {
    return null
  }

  const CustomToolbar = () => (
    <Toolbar>
      <SaveButton />
    </Toolbar>
  )

  return (
    <div className="Settings">
      <Card>
        <Title title="Settings" />
        <EditContextProvider
          value={{
            record: settings,
            save: onSubmit,
            saving
          }}
        >
          <SimpleForm toolbar={<CustomToolbar />}>
            <Box sx={{ maxWidth: 400 }}>
              <h3 style={{ marginTop: 10 }}>Searchbox Settings</h3>
              <BooleanInput source="enableTaxonomySearches" label="Enable taxonomy suggestions" />
              <BooleanInput source="enableTrendingSearches" label="Enable trending suggestions" />
              <BooleanInput source="enableRelatedSearches" label="Enable related search suggestions" />
              <h3>Trending Criteria</h3>
              <SelectInput
                source="trendingRange"
                choices={[
                  { id: 'week', name: 'Last 7 days' },
                  { id: 'month', name: 'Last 30 days' },
                  { id: 'quarter', name: 'Last 120 days' },
                  { id: 'year', name: 'Last 365 days' }
                ]}
                fullWidth
              />
              <NumberInput source="trendingMinCount" label="Minimum # of hits for trending" fullWidth />
              <NumberInput source="trendingMaxShow" label="Maximum # of trends to show in suggestions" fullWidth />
              {saving ? null : <TrendPreview />}
            </Box>

            <h3 style={{ margin: 0, padding: '30px 0 15px' }}>Scheduled Tasks</h3>
            <ScheduledTasks />

            <h3 style={{ margin: 0, padding: '30px 0 15px' }}>Database Settings</h3>
            <SyncInfo />
          </SimpleForm>
        </EditContextProvider>
      </Card>
    </div>
  )
}

function TrendPreview() {
  const notify = useNotify()
  const record = useRecordContext()
  const manualTrendsCtl = useController({ name: 'manualTrends' })
  const trendsCtl = useController({ name: 'trends' })
  const [trends, setTrends] = useState(null)
  const [style, setStyle] = useState('AUTO')

  useEffect(() => {
    if (record.manualTrends) {
      setStyle('MANUAL')
      axios.get(API_URL + '/trends/manual').then(res => {
        setTrends(res.data.map((text, i) => ({ id: String(i + 1), text })))
      })
    } else {
      axios
        .get(API_URL + '/trends')
        .then(res => {
          setTrends(res.data.map((text, i) => ({ id: String(i + 1), text })))
        })
        .catch(err => {
          notify(err.message)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record])

  useEffect(() => {
    trendsCtl.field.onChange(trends)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trends])

  useEffect(() => {
    manualTrendsCtl.field.onChange(style === 'MANUAL')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style])

  const onAddClick = () => {
    setTrends([{ id: String(Math.round(Math.random() * -1000)), text: '' }, ...trends])
  }

  const onRemoveClick = i => {
    const trends2 = [...trends]
    trends2.splice(i, 1)
    setTrends(trends2)
  }

  const onTextChange = (e, trend, i) => {
    const trends2 = [...trends]
    trends2.splice(i, 1, { ...trend, text: e.target.value })
    setTrends(trends2)
  }

  // #region dnd

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const trends2 = reorder(trends, result.source.index, result.destination.index)

    setTrends(trends2)
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const grid = 8

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#f3f3f3' : '#ffffff',

    // styles we need to apply on draggables
    ...draggableStyle
  })

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#f3f3f3' : '#fafafa',
    padding: grid
  })

  // #endregion dnd

  return (
    <div className="TrendPreview">
      {!trends ? (
        'Loading...'
      ) : (
        <>
          <h4>Current List of Trending</h4>
          <div className="actions">
            <ButtonGroup size="small">
              <Button
                variant={style === 'AUTO' ? 'contained' : 'outlined'}
                onClick={() => setStyle('AUTO')}
                disableElevation
              >
                Auto
              </Button>
              <Button
                variant={style === 'MANUAL' ? 'contained' : 'outlined'}
                onClick={() => setStyle('MANUAL')}
                disableElevation
              >
                Manual
              </Button>
            </ButtonGroup>
            {style === 'MANUAL' ? (
              <IconButton className="add" size="small" onClick={onAddClick}>
                <AddIcon />
              </IconButton>
            ) : null}
          </div>
          <div className="list">
            {style === 'AUTO' ? (
              <>
                {trends.map((t, i) => (
                  <div key={i} className="trend trend-auto">
                    {t.text}
                  </div>
                ))}
              </>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {trends.map((t, i) => (
                        <Draggable key={t.id} draggableId={t.id} index={i}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              className="trend trend-manual"
                              {...provided.draggableProps}
                              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              <IconButton className="drag-handle" size="small" {...provided.dragHandleProps}>
                                <DragIndicatorIcon />
                              </IconButton>
                              {Number(t.id) < 0 ? (
                                <>
                                  <input
                                    type="text"
                                    placeholder="Add text..."
                                    value={t.text}
                                    onChange={e => onTextChange(e, t, i)}
                                    autoFocus
                                    autoCapitalize="off"
                                  />
                                  <span className="badge">CUSTOM</span>
                                </>
                              ) : (
                                <span className="text">{t.text}</span>
                              )}
                              <IconButton className="remove" size="small" onClick={() => onRemoveClick(i)}>
                                <RemoveIcon />
                              </IconButton>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function ScheduledTasks() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const notify = useNotify()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_URL + '/settings/cron')
      setData(res.data)
      setLoading(false)
    } catch (err) {
      notify(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onStopClick = async job => {
    try {
      await axios.post(API_URL + `/settings/cron?action=stop&job=${job}`)
      fetchData()
    } catch (err) {
      notify(err.message)
    }
  }

  const onStartClick = async job => {
    try {
      await axios.post(API_URL + `/settings/cron?action=start&job=${job}`)
      fetchData()
    } catch (err) {
      notify(err.message)
    }
  }

  if (loading) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 183 }}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="ScheduledTasks">
      <Stack direction="row" spacing={2}>
        {data.map(job => (
          <Card key={job.name} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography mb={2}>{job.name}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9em' }}>
                Status: {job.active ? 'Active' : 'Inactive'}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9em' }}>
                Last run: {job.lastDate ? dayjs(job.lastDate).format('l LT') : 'N/A'}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9em' }}>
                Next run: {job.nextDate ? dayjs(job.nextDate).format('l LT') : 'N/A'}
              </Typography>
            </CardContent>
            <CardActions>
              {job.active ? (
                <Button size="small" onClick={() => onStopClick(job.name)}>
                  Stop
                </Button>
              ) : (
                <Button size="small" onClick={() => onStartClick(job.name)}>
                  Start
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  )
}

function SyncInfo() {
  const [saving, setSaving] = useState(false)
  const [date, setDate] = useState(false)
  const notify = useNotify()

  const fetchDate = async () => {
    const res = await axios.get(API_URL + '/settings/sync_db')
    setDate(dayjs(res.data))
  }

  useEffect(() => {
    fetchDate()
  }, [])

  const onClick = async () => {
    try {
      setSaving(true)
      await axios.post(API_URL + '/settings/sync_db')
      setSaving(false)
      fetchDate()
    } catch (err) {
      setSaving(false)
      notify(err.message, { type: 'error' })
    }
  }

  return (
    <Box className="SyncInfo" sx={{ pb: 10 }}>
      <div>Last sync date: {date ? date.format('l LT') : '[unknown]'}</div>
      {saving ? (
        <div style={{ paddingTop: 21, paddingBottom: 10 }}>Working on it, check back in 10 minutes</div>
      ) : (
        <Button variant="outlined" onClick={onClick} startIcon={<SyncIcon />} sx={{ mt: 2 }}>
          Sync now
        </Button>
      )}
    </Box>
  )
}
