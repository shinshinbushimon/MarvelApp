import winston from 'winston';
/*
    エラー箇所でlogger.error, 通常のケースでlogger.infoで呼び出し
*/
export const logger = winston.createLogger({
    level: 'info',  // ログレベル
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        // コンソールへの出力
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ level, message, timestamp, trace }) => 
                    `${timestamp} [${level}] ${message} (at ${trace})`)
            )
        }),
        // ファイルへの出力設定
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
